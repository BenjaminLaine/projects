/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sort_4.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/03/08 15:47:53 by blaine            #+#    #+#             */
/*   Updated: 2020/06/16 21:26:59 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	ft_sort_fa(t_file **files, t_opt *opt)
{
	t_file *sort;

	sort = (*files);
	(*files) = ft_merge_sort(sort, opt);
}

t_file	*ft_find_middle(t_file *list)
{
	t_file	*middle;
	t_file	*middle_next;

	middle = list;
	middle_next = list;
	if (list != NULL)
	{
		while (middle_next != NULL && middle_next->next != NULL)
		{
			middle_next = middle_next->next->next;
			if (middle_next != NULL)
				middle = middle->next;
		}
	}
	return (middle);
}

void	ft_swap_tr(t_file **first, t_file **second, t_file **tmp, int i)
{
	if (i && (*first)->data->stats.st_mtime < (*second)->data->stats.st_mtime)
	{
		(*tmp) = (*first);
		(*first) = (*tmp)->next;
	}
	else if (i == 1)
	{
		(*tmp) = (*second);
		(*second) = (*tmp)->next;
	}
	if (i == 1)
		return ;
	if ((*first)->data->stats.st_mtime < (*second)->data->stats.st_mtime)
	{
		(*tmp)->next = (*first);
		(*tmp) = (*first);
		(*first) = (*tmp)->next;
	}
	else
	{
		(*tmp)->next = (*second);
		(*tmp) = (*second);
		(*second) = (*tmp)->next;
	}
}

void	ft_swap_tn(t_file **first, t_file **second, t_file **tmp, int i)
{
	if (i && (*first)->data->stats.st_mtime > (*second)->data->stats.st_mtime)
	{
		(*tmp) = (*first);
		(*first) = (*tmp)->next;
	}
	else if (i == 1)
	{
		(*tmp) = (*second);
		(*second) = (*tmp)->next;
	}
	if (i == 1)
		return ;
	if ((*first)->data->stats.st_mtime > (*second)->data->stats.st_mtime)
	{
		(*tmp)->next = (*first);
		(*tmp) = (*first);
		(*first) = (*tmp)->next;
	}
	else
	{
		(*tmp)->next = (*second);
		(*tmp) = (*second);
		(*second) = (*tmp)->next;
	}
}

t_file	*ft_merge_list_t(t_file *first, t_file *second, t_opt *opt)
{
	t_file *tmp;
	t_file *start;

	if (first == NULL)
		return (second);
	if (second == NULL)
		return (first);
	if (opt->r == 0)
		ft_swap_tn(&first, &second, &tmp, 1);
	else
		ft_swap_tr(&first, &second, &tmp, 1);
	start = tmp;
	while (first != NULL && second != NULL)
	{
		if (opt->r == 0)
			ft_swap_tn(&first, &second, &tmp, 0);
		else
			ft_swap_tr(&first, &second, &tmp, 0);
	}
	if (first == NULL)
		tmp->next = second;
	if (second == NULL)
		tmp->next = first;
	return (start);
}
