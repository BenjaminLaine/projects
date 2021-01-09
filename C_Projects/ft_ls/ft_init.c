/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_init.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/03/18 01:55:23 by blaine            #+#    #+#             */
/*   Updated: 2020/06/16 22:24:16 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

t_max	ft_init_max(void)
{
	t_max max;

	max.perm = 10;
	max.links = 0;
	max.user = 0;
	max.group = 0;
	max.size = 0;
	max.name = 0;
	max.total = 0;
	return (max);
}

t_opt	*ft_init_opti(void)
{
	t_opt *opt;

	if (!(opt = malloc(sizeof(t_opt))))
		ft_printf("%s\n", strerror(errno));
	opt->a = 0;
	opt->l = 0;
	opt->r = 0;
	opt->rr = 0;
	opt->t = 0;
	return (opt);
}

t_dir	*ft_init_dir(void)
{
	t_dir *dir;

	if (!(dir = malloc(sizeof(t_dir))))
		ft_printf("%s\n", strerror(errno));
	dir->next = NULL;
	dir->path = NULL;
	dir->files = NULL;
	dir->previous = NULL;
	return (dir);
}
