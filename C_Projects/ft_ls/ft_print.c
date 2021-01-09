/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_print.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/03/18 02:51:45 by blaine            #+#    #+#             */
/*   Updated: 2020/06/18 01:14:44 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	ft_print_l(t_file **files, t_max max, int arg)
{
	t_file	*print;

	print = *files;
	if (arg != 0)
		ft_printf("total %d\n", max.total);
	while (print)
	{
		ft_printf("%s%*d  %-*s %-*s%*d %s %s", print->data->perm, max.links + 1,
					print->data->link, max.user + 1, print->data->user,
					max.group, print->data->group, max.size + 1,
					print->data->size, print->data->mtime, print->data->name);
		if (print->data->link_name)
			ft_printf(" -> %s", print->data->link_name);
		write(1, "\n", 1);
		print = print->next;
	}
}

void	ft_print_n(t_file **files)
{
	t_file		*print;
	int			count;

	count = 0;
	print = *files;
	while (print)
	{
		ft_printf("%s\n", print->data->name);
		print = print->next;
		count++;
	}
}

void	ft_print_files(t_file *files, t_opt *opt, int arg, t_max max)
{
	if (opt->l)
		ft_print_l(&files, max, arg);
	else
		ft_print_n(&files);
	if (files != NULL && !opt->l && opt->rr && arg != 0)
		ft_printf("\n");
}

void	ft_usage(char c)
{
	ft_printf("ft_ls: invalid option '%c'\nAvailable options '-alrRt'.\n", c);
	exit(0);
}
